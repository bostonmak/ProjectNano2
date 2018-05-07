@echo off
@title ProjectNano
set CLASSPATH=.;build\dist\*;cores\*
java -Xmx2048m -Dwzpath=wz\ net.server.Server
pause