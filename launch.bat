@echo off
@title MapleSolaxia
set CLASSPATH=.;dist\*
java -Dwzpath=wz\ net.server.Server
pause