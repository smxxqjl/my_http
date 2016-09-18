#include <unp.h>
#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include "readline.h"

#define CRLF "\r\n"
#define MAXREQUEST 8192

/* The longest method name is 6 char hence include null terminator we make it 7 */
#define MAXMETHOD 8
#define OPTIONS 0
#define GET 1
#define HEAD 2
#define POST 3
#define PUT 4
#define DELETE 5
#define TRACE 6
#define CONNECT 7
#define UNKNOWN 8

struct lenstring {
    char *string;
    int len;
};

void abnormal_response(int connfd, int status_code, char *reason);
void implement_get(int, char*);
/*
 *  function scan the line character array from line plus offset and fill subline with every charcter it does go through. 
 *  Once detect a sep or a null terminator, break the loop and return the number of charcter it fill.
 *  The seprater will not be filled in sublline.
 */
int seperate_by_sep(char *content, char *subline, int maxline, char sep)
{
    int i;

    i = 0;
    while(content[i] != '\0' && content[i] != sep && i < maxline - 1) {
	subline[i] = content[i];
	i++;
    }
    subline[i] = '\0';
    return i;
}

/*
 * The function scan string content from start point(i.e. content[start]), if "/r/n" is found
 * return a lenstring struct string point to content[start] and len is character from content[start]
 * to /n in "/r/n"  
 */
struct lenstring* getfeedline(char *content, int length) 
{
    int i, carryflag;
    struct lenstring* restring;
    carryflag = 0;
    restring = (struct lenstring*)malloc(sizeof(struct lenstring));
    restring->string = content;

    for(i = 0; i < length; i++) {
	if(carryflag == 1) {
	    if(content[i] == '\n') {
		restring->len = i + 1;
		content[i] = '\0';
		return restring;
	    }
	    else {
		carryflag = 0;
	    }
	}

	if(content[i] == '\r')
	    carryflag = 1;
    }
    return NULL;
}

int testfun(int fd) 
{
    int start;
    char request[MAXREQUEST];
    struct lenstring* ptr;

    snprintf(request, MAXREQUEST, "HTTP/1.0 200 OK\r\n"
	    "MIME-Version: 1.0\r\n"
	    "Date: Mon, 8 Jan 2010 4:59:42 GMT\r\n"
	    "Server: Apache-Coyote/1.1\r\n"
	    "Content-type: text/html\r\n"
	    "Content-length: 1000000\r\n"
	    "\r\n"
	    "<html>\r\n"
	    "Hello,World\r\n"
	    "</html>\r\n"
	    );
    start = 0;
    write(fd, request, strlen(request));
    return 0;
}

void request_handle(int connfd)
{	    
    char line[MAXLINE], sepline[MAXLINE], method[MAXMETHOD], *iterptr, *reason;
    int getlen, i, methodtype;

    /*
    while (readfeedline(connfd, request, MAXREQUEST) > 1) {
	printf("%s\n", request);
	iterptr = request;
    }
    */

    readfeedline(connfd, line, MAXLINE);  
    i = 0;
    while(line[i] != ' ' && line[i] != '\0' && i < MAXMETHOD) {
	method[i] = line[i];
	i++;
    }
    printf("%s\n", method);
    if(i == MAXMETHOD)
	methodtype = UNKNOWN;
    else {
	method[i] = '\0';
	if (strcasecmp(method, "OPTIONS") == 0)
	    methodtype = OPTIONS;
	else if (strcasecmp(method, "GET") == 0)
	    methodtype = GET;
	else if (strcasecmp(method, "HEAD") == 0)
	    methodtype = HEAD;
	else if (strcasecmp(method, "POST") == 0)
	    methodtype = POST;
	else if (strcasecmp(method, "PUT") == 0)
	    methodtype = PUT;
	else if (strcasecmp(method, "DELETE") == 0)
	    methodtype = DELETE;
	else if (strcasecmp(method, "TRACE") == 0)
	    methodtype = TRACE;
	else if (strcasecmp(method, "CONNECT") == 0)
	    methodtype = CONNECT;
	else
	    methodtype = UNKNOWN;
    }
    switch(methodtype) {
	case GET:
	    implement_get(connfd, line);
	    break;
	case OPTIONS:
	case HEAD:
	case POST:
	case PUT:
	case DELETE:
	case TRACE:
	case CONNECT:
	    reason = "Not-Implement";
	    abnormal_response(connfd, 501, reason);
	    break;
	case UNKNOWN:
	default:
	    reason = "Bad-Request";
	    abnormal_response(connfd, 400, reason);
	    break;
    }
}
void not_found(int connfd)
{
    return;
}

#define MAXPATH 255
#define MAXBUF 1024
void implement_get(int connfd, char *requestline)
{
    int i, j, cgi_re, content_len, wfilefd;
    char path[MAXPATH], *index_file, *cgi_name, *reason, readbuf[MAXBUF], header[MAXREQUEST], *currenttime;
    cgi_name = "/cgi";
    i = j = 0;

    /* Ignore method and space */
    while(requestline[i++] != ' ');
    i++;

    /* parse if it's cgi */
    if (strncmp(path, cgi_name, strlen(cgi_name)) == 0)
	cgi_re = 1;
    else
	cgi_re = 0;

    /* Get the file path and change dir into it */
    while(requestline[i] != ' ') {
	path[j++] = requestline[i++];
    }
    if (j != 0) {
	path[j--] = '\0';
	while(path[j--] != '/' && j >= 0);
	path[++j] = '\0';
	if (chdir(path) != 0)
	    not_found(connfd);

	/* set file name, if not specified make it index.html */
	if (path[j+1] == '\0')
	    index_file = "index.html";
	else
	    index_file = path + j + 1;
    }
    else
	index_file = "index.html";

    /* check permission and write back response */
    reason = "Unauthorized";
    if (access(index_file, F_OK) != 0)
	abnormal_response(connfd, 401, reason);
    if (cgi_re) {
	if (access(index_file, X_OK))
	    if (fork() == 0) {
		return; 
	    }
	else
	    abnormal_response(connfd, 401, reason);
    }
    else {
	struct stat buf;
	if (access(index_file, R_OK) == 0 && (wfilefd = open(index_file, O_RDONLY)) != -1) {
	    int readnum;
	    fstat(wfilefd, &buf);
	    content_len = buf.st_size;

	    /* This time get code may be faulty when race condition occurs */
	    time_t temptp;
	    time(&temptp);
	    currenttime = asctime(gmtime(&temptp));
	    currenttime[strlen(currenttime) - 1] = '\0';
	    snprintf(header, MAXREQUEST, "HTTP/1.0 200 OK \r\n"
		    "MIME-Version: 1.0\r\n"
		    "Date: %s\r\n"
		    "Server: hkh/1.1\r\n"
		    "Content-length: %d\r\n"
		    "Content-Type: text/html; charset=utf-8\r\n"
		    "Trasfer-Encoding: chunked\r\n"
		    "\r\n",
		    currenttime,content_len);
	    while ((readnum = read(wfilefd, &readbuf, MAXBUF)) != 0)
		write(connfd, readbuf, readnum);
	}
	else {
	    abnormal_response(connfd, 401, reason);
	}
    }
}

#define MAXRESPONSE 1024
void abnormal_response(int connfd, int status_code, char *reason)
{
    char response[MAXRESPONSE];

    snprintf(response, MAXRESPONSE, "HTTP/1.0 %d %s\r\n"
	    			"\r\n"
	    ,status_code, reason);
    write(connfd, response, strlen(response));
}

int main()
{
    char request[MAXREQUEST];
    int listenfd, connfd, start, connum, requestlen, reuse;
    pid_t childpid;
    socklen_t clilen;
    struct sockaddr_in cliaddr, servaddr;
    struct lenstring *ptr;

    listenfd = Socket(AF_INET, SOCK_STREAM, 0);

    if (setsockopt(listenfd, SOL_SOCKET, SO_REUSEADDR, (char *)&reuse, sizeof(int)) == -1) {
	perror("set reuse error");
    }

    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
    servaddr.sin_port = htons(SERV_PORT);
    printf("%d\n", SERV_PORT);


    Bind(listenfd, (SA *) &servaddr, sizeof(servaddr));

    Listen(listenfd, LISTENQ);

    for( ; ; ) {
	clilen = sizeof(cliaddr);
	connfd = Accept(listenfd, (SA *) &cliaddr, &clilen);
	printf("A request occurs\n");

	if((childpid = Fork()) == 0) {
	    Close(listenfd);
	    request_handle(connfd);
	    exit(0);
	}
	Close(connfd);
    }
}

/*
int main()
{
    char *mainline = "hello darkness my old friend\n";
    char subline[MAXLINE], *ptr;
    int getlen;

    ptr = mainline;
    while(((getlen = seperate_by_sep(ptr, subline, MAXLINE, ' '))>0) && ptr[getlen] != '\0') {
	printf("%s\n", subline);
	ptr += getlen;
	printf("%d", getlen);
    }
    return 0;
}
*/
