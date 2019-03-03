@echo off
@title ProjectNano
set CLASSPATH=.;dist\*;cores\*
java -server -Xms4g -Xmx4g -Denv=local -Dwzpath=wz\ net.server.Server
pause