# Shell Lab

## 概述

https://csapp.cs.cmu.edu/3e/shlab.pdf

## 看代码

```
char prompt[] = "tsh> "; 
```

shell会输出tsh>提示输入

```

char cmdline[MAXLINE];
```

MAXLINE为1024，cmdline为装输入的东西的字符串数组

```
while (1) {

        /* Read command line */
        if (emit_prompt) {
            printf("%s", prompt);
            fflush(stdout);
        }
        if ((fgets(cmdline, MAXLINE, stdin) == NULL) && ferror(stdin))
            app_error("fgets error");
        if (feof(stdin)) { /* End of file (ctrl-d) */
            fflush(stdout);
            exit(0);
        }

        /* Evaluate the command line */
        eval(cmdline);
        fflush(stdout);
        fflush(stdout);
    }

```

这一段是shell执行逻辑，本质是一个死循环不断等用户输入，执行用户输入

eval(cmdline)即执行用户输入的根本逻辑，是第一个要实现的函数

```

int parseline(const char *cmdline, char **argv)
{
    static char array[MAXLINE]; /* holds local copy of command line */
    char *buf = array;          /* ptr that traverses command line */
    char *delim;                /* points to first space delimiter */
    int argc;                   /* number of args */
    int bg;                     /* background job? */

    strcpy(buf, cmdline);
    buf[strlen(buf)-1] = ' ';  /* replace trailing '\n' with space */
    while (*buf && (*buf == ' ')) /* ignore leading spaces */
        buf++;

    /* Build the argv list */
    argc = 0;
    if (*buf == '\'') {
        buf++;
        delim = strchr(buf, '\'');
    }
    else {
        delim = strchr(buf, ' ');
    }
```
```
```


const char * cmdline 强调只读字符串 char ** argv强调对char* argv取值

buf是一个游标指针 负责从左往右读输入的字符串

先把最后的\n替换为空格，再把开头可能存在的空格都省掉

 这个\'代表什么？

## 写代码

<!-- TODO: 添加实验步骤 -->

## 关键知识点

<!-- TODO: 添加关键知识点 -->

## 常见问题

<!-- TODO: 添加常见问题及解决方案 -->
