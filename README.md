# HeavenMS (MapleSolaxiaV2)
---

## Head developer: Ronan C. P. Lana

Credits are to be given too to Nexon(Duh!), the original MapleSolaxia staff and other colaborators, as just some changes/patches on the game were applied by myself, in which some of them diverged from the original v83 patch contents.

Regarding distributability and usage of the code presented here: like it was before, this MapleStory server is open-source. By that, it is meant that anyone is free to install, use, modify and redistribute the contents, as long as there is no kind of commercial trading involved and the credits to the original creators are maintained within the codes.

This is a NetBeans 8.0.2 Project, that MUST be built and run under JDK/JRE 7 in order to run properly. This means that it's easier to install the project via opening the server project folder inside NetBeans' IDE. Once installed, build this project on your machine and run the server using the "launch.bat" application.

In this project, many gameplay-wise issues generated from either the original WZ files and the server sources have been partially or completely solved. Considering the use of the provided edited WZ's and server-side wz.xml files should be of the greatest importance when dealing with this instance of private server, in order to perceive it at it's full potential. My opinion, though! Refer to "README_wzchanges.txt" for more information on what has been changed from Nexon's v83 WZ files.

The main objective of this project is to try as best as possible to recreate what once was the original MapleStory v83, while adding up some flavors that spices up the gameplay. In other words, aim to get the best of the MapleStory of that era.

---
### Download items 

Server files: https://github.com/ronancpl/HeavenMS

Client files & general tools: https://drive.google.com/drive/folders/0BzDsHSr-0V4MYVJ0TWIxd05hYUk

**Important note about localhosts**: these executables are red-flagged by antivirus tools as __potentially malicious softwares__, this happens due to the reverse engineering methods that were applied onto these software artifacts. Those depicted here have been put to use for years already and posed no harm so far, so they are soundly assumed to be safe.

Recommended localhost: https://hostr.co/fuzm4X9j7TWh

* Current revision: 'n' problem fixed and removed caps for WATK, WDEF, MDEF, ACC, AVOID.

  * 'n' problem fixed https://hostr.co/r5QDmhlxpp8M

  * Fraysa's https://hostr.co/gJbLZITRVHmv

  * MapleSilver's starting on window-mode

---
### Support us

Feel free to __root for us__ on our endeavour at our Discord channel, or even actively **help us improve** the server by issuing pull requests with informative details about what's changing.

Also, if you liked this project, please don't forget to __star__ the repo ;) .

Discord: https://discord.gg/Q7wKxHX

### Donation

If you REALLY liked what you have seen on the project, please feel free to donate a little something as a helping hand for my contributions towards Maple development. Also remember to **support Nexon**!

Paypal: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3K8KVTWRLFBQ4

---
### Preparing the ambient 

The following link teaches on how to install a MapleStory v83 private server, however IT DIFFERS on what is used here: http://forum.ragezone.com/f428/maplestory-private-server-v83-741739/

Use that link ONLY AS AN ORIENTATION on where here things start to become ambiguous.

Firstly, install all the general tools required to run the server:

* WampServer2.0i.exe -> recipient of the MySQL server.
* mysql-query-browser.msi -> MySQL client component, visually shows the DB data and hubs queries.
* hamachi.msi -> used for establishing a tunnelling route for the server/client communication.


Now install the Java 7 Development Kit:

* jdk-7u79-windows-x64.exe
* netbeans-8.0.2-javase-windows.exe -> It's a NetBeans project, use other IDE at your own risk.

Now that the tools have been installed, test if they are working.

For WampServer:

* Once you're done installing it, run it and you will see the Wamp icon on the bottom right corner.
Left click it and click 'Put Online'.
* In case of ORANGE ICON, change port 80 at "httpd.conf" to another, as it clashes with a Windows default port. Then Left click it again and click 'Start All Services'.
* The Wamp icon must look completely green (if its orange or red, you have a problem).

For Hamachi:

* Try opening it. It's that simple.

Hamachi is optional, though. You don't have to install Hamachi if you want to make the server just for use on your own machine. However, if you want to let other players access your server, consider alternatively using port-forwarding methods.

---
### Installing the SERVER 

Set the "HeavenMS" folder on a place of your preference. It is recommended to use "C:\Nexon\HeavenMS".

Setting up the SQL: open MySQL Query Browser, then create a new session with the parameters below, then click OK.

Server Host: localhost		Port: 3306		Username: root

Now it must be done CAREFULLY:

1. File -> Open Script... -> Browse for "C:\Nexon\HeavenMS\sql" -> db_database.sql, and execute it.

2. File -> Open Script... -> Browse for "C:\Nexon\HeavenMS\sql" -> db_drops.sql, and execute it.

Now it is OPTIONAL, you don't need to run it if you don't want, as it will simply change some NPC shops to set some new goods, not present in the original MapleStory, to sell:

3. File -> Open Script... -> Browse for "C:\Nexon\HeavenMS\sql" -> db_shopupdate.sql, and execute it.

At the end of the execution of these SQLs, you should have installed a database schema named "heavenms". REGISTER YOUR FIRST ACCOUNT to be used in-game by **creating manually** an entry on the table "accounts" at that database with a login and a password.

Configure the IP you want to use for your MapleStory server in "configuration.ini" file, or set it as "localhost" if you want to run it only on your machine. Alternatively, you can use the IP given by Hamachi to use on a Hamachi network, or you can use a non-Hamachi method of port-forwarding. Neither will be approached here.

#### The following is no longer necessary. You may skip to "Building the JAR" or you can continue using the old method.
Now open NetBeans, and click "Open a project..." . Select then the "HeavenMS" folder, that should already be a project recognizable by NetBeans. If it isn't, you have a problem.

#### Inside the project, you may encounter some code errors.

These errors pops-up because you have not set yet the "cores" of the project. From the project hierarchy, right-click the project and select "Resolve Project Problems".

Locate the "cores" folder inside the root directory of this project and manually configure the missing files with the files that are there.

Also, a new Java7 platform must be defined to run the server. Click "Manage Platforms...", then "Add platform", browse through until you locate the Java7 folder in the file system, it should be at "C:\Program Files\Java". Then, name this new platform "JDK 1.7".

Finally, select "Clean and Build project" to build the JAR file for the MapleStory server. Once done, make sure both WampServer and Hamachi are on and functional, then execute "launch.bat" on the root of the project. If no errors were raised from this action, your MapleStory server is now online.

---
### To Setup Gradle

Set your JDK7 Path

Create a file called `gradle.properties`

Create a variable called `JDK7_HOME` and set it to your JDK7 path

For example: `JDK7_HOME=C:\Program Files\Java\jdk1.7.0_79`

### Building the JAR with Gradle (New Method)

To construct the jar, run:

`./gradlew clean build` 

The jar is now created at `build/dist`

To construct the jar and copy it to the `dist/` directory:

Run `./gradlew buildAndCopy`

### Running the Server

Run `launch.bat`

---
### Installing the CLIENT 

#### Setting up client-side ambient

The client's set-up is quite straightforward:

1. From "ManagerMsv83.exe", install MapleStory on your folder of preference (e.g. "C:\Nexon\MapleStory") and follow their instructions.
2. Once done, erase these files: "HShield" (folder), "ASPLauncher.exe", "MapleStory.exe" and "patcher.exe".
3. Extract into the client folder the "localhost.exe" from the provided link.
4. Overwrite the original WZ files with the ones provided from either one of those folders on the Google Drive:
	- "rev???_wz" (last published RELEASE, source update of same number).
	- "current_wz" (latest source update).

#### Editing localhost IP target

If you are not using "localhost" as the target IP on the server's config file, you will need to HEX-EDIT "localhost.exe" to fetch your IP. Track down all IP locations by searching for "Text String" "127.0.0.1", and applying the changes wherever it fits.

To hex-edit, install the Neo Hex Editor from "free-hex-editor-neo.exe" and follow their instructions. Once done, open "localhost.exe" for editing and overwrite the IP values under the 3 addresses. Save the changes and exit the editor.

#### Testing the localhost

Open the "localhost.exe" client. If by any means the program did not open, and checking the server log your ping has been listened by the server and you are using Windows 8 or 10, it probably might be some compatibility issue.

In that case, extract "lolwut.exe" from "lolwut-v0.01.rar" and place it on the MapleStory client folder ("C:\Nexon\MapleStory"). Your "localhost.exe" property settings must follow these:

* Run in compatibility mode: Windows 7;
* Unchecked reduced color mode;
* 640 x 480 resolution;
* Unchecked disable display on high DPI settings;
* Run as an administrator;
* Opening "lolwut.exe", use Fraysa's method.

Important: should the client be refused a connection to the game server, it may be because of firewall issues. Head to the end of this file to proceed in allowing this connection through the computer's firewall. Alternatively, one can deactivate the firewall and try opening the client again.

---
### Some notes about WZ/WZ.XML EDITING 

NOTE: Be extremely wary when using server-side's XMLs data being reimporting into the client's WZ, as some means of synchronization between the server and client modules, this action COULD generate some kind of bugs afterwards. Client-to-server data reimporting seems to be fine, though.

#### Editing the v83 WZ's:

* Use the HaRepacker 4.2.4 editor, encryption "GMS (old)".
* Open the desired WZ for editing and use the node hierarchy to make the desired changes (copy/pasting nodes may be unreliable in rare scenarios).
* Save the changed WZ, **overwriting the original content** at the client folder.
* Finally, **RE-EXPORT (using the "Private Server..." exporting option) the changed XMLs into the server's WZ.XML files**, overwriting the old contents.

**These steps are IMPORTANT, to maintain synchronization** between the server and client modules.

#### The MobBookUpdate example

As an example of client WZ editing, consider the MapleMobBookUpdate tool project I developed, it updates all reported drop data on the Monster Book with what is currently being hold on the database:

To make it happen:

* Open the MobBookUpdate project on NetBeans, located at "tools\MapleMobBookUpdate", and build it.
* At the subfolder "lib", copy the file "MonsterBook.img.xml". This is from the original WZ v83.
* Paste it on the "dist" subfolder.
* Inside "dist", open the command prompt by alt+right clicking there.
* Execute "java -jar MobBookUpdate.jar". It will generate a "MonsterBook_updated.img.xml" file.
* At last, overwrite the "MonsterBook.img.xml" on "C:\Nexon\HeavenMS\wz\String.wz" with this file, renaming it back to "MonsterBook.img.xml".

At this point, **just the server-side** Monster Book has been updated with the current state of the database's drop data.

To **update the client as well**, open HaRepacker 4.2.2 and load "String.wz" from "C:\Nexon\MapleStory". Drop the "MonsterBook.img" node by removing it from the hierarchy tree, then import the server's "MonsterBook.img.xml".

**Note:** On this case, a server-to-client data transfer has been instanced. This kind of action **could cause** problems on the client-side if done unwary, however the nodes being updated on client-side and server-side provides no conflicts whatsoever, so this is fine. Remember, server-to-client data reimport may be problematic, whereas client-to-server data reimport is fine.

The client's WZ now has the proper item drops described by the DB updated into the MobBook drop list.

**Save the changes and overwrite the older WZ** on the MapleStory client folder.

---
### Portforwarding the SERVER

To use portforward, you will need to have permission to change things on the LAN router. Access your router using the Internet browser. URLs vary accordingly with the manufacturer. To discover it, open the command prompt and type "ipconfig" and search for the "default gateway" field. The IP shown there is the URL needed to access the router. Also, look for the IP given to your machine (aka "IPv4 address" field), which will be the server one. 

The default login/password also varies, so use the link http://www.routerpasswords.com/ as reference. Usually, login as "admin" and password as "password" completes the task well.

Now you have logged in the router system, search for anything related to portforwarding. Should the system prompt you between portforwarding and portriggering, pick the first, it is what we will be using.

Now, it is needed to enable the right ports for the Internet. For MapleSolaxia, it is basically needed to open ports 7575 to 7575 + (number of channels) and port 8484. Create a new custom service which enables that range of ports for the server's channel and opt to use TCP/UDP protocols. Finally, create a custom service now for using port 8484.

Optionally, if you want to host a webpage, portforward the port 80 (the HTTP port) as well.

It is not done yet, sometimes the firewalls will block connections between the LAN and the Internet. To overcome this, it is needed to create some rules for the firewall to permit these connections. Search for the advanced options with firewalls on your computer and, with it open, create two rules (one outbound and one inbound).

These rules must target "one application", "enable connections" and must target your MapleStory client (aka localhost).

After all these steps, the portforwarding process should now be complete.
