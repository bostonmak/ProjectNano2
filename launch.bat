@echo off
@title ProjectNano
set CLASSPATH=.;dist\*
java -Dwzpath=wz\ net.server.Server
pause