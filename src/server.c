#include <unp.h>
#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include "readline.h"

#define CRLF "\r\n"
#define MAXREQUEST 8192
struct lenstring {
    char *string;
    int len;
};

/*
 *  function scan the line character array from line plus offset and fill subline with every charcter it does go through. 
 *  Once detect a sep or a null terminator, break the loop and return the number of charcter it fill.
 *  The seprater will not be filled in sublline.
 */
int seperate_by_sep(char *content, char *subline, int maxline, char sep)
{
    int i;

    i = 0;
    while(content[i] != '\0' || content[i] != sep|| i >= maxline - 1) {
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
struct lenstring* getfeedline(char *content, int start, int length) 
{
    int i, carryflag;
    struct lenstring* restring;
    carryflag = 0;
    restring = (struct lenstring*)malloc(sizeof(struct lenstring));
    restring->string = content + start;

    for(i = start; i < length; i++) {
	if(carryflag == 1) {
	    if(content[i] == '\n') {
		restring->len = i - start + 1;
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
	    "Content-length: 1\r\n"
	    "\r\n"
	    "<html>\r\n"
	    "Hello,World\r\n"
	    "</html>\r\n"
	    );
    start = 0;
    /*
    while((ptr = getfeedline(request, start , strlen(request))) != NULL) {
	start += ptr->len;
	printf("The len is %d\n", ptr->len);
    }
    */
    write(fd, request, strlen(request));
    return 0;
}

void request_handle(int connfd)
{	    
    char request[MAXREQUEST];
    while (readfeedline(connfd, request, MAXREQUEST) > 1)
	printf("%s\n", request);
    testfun(connfd);
}

int main()
{
    char request[MAXREQUEST];
    int listenfd, connfd, start, connum, requestlen;
    pid_t childpid;
    socklen_t clilen;
    struct sockaddr_in cliaddr, servaddr;
    struct lenstring *ptr;

    listenfd = Socket(AF_INET, SOCK_STREAM, 0);

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
	    /*
	    while((connum = read(connfd, request, MAXREQUEST)) != 0) {
	    	start = 0;
	    	requestlen = strlen(request);
		printf("The total num is %d\n", connum);
		while((ptr = getfeedline(request, start, requestlen)) != NULL) {
		    start += ptr->len;
		    printf("The len is %d\n", ptr->len);
		    printf("%s", request+start);
		}
	    }
	    */
	    request_handle(connfd);
	    exit(0);
	}
	Close(connfd);
    }
}
