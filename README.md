# Project Nano

Credits to: Ronan C. P. Lana

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

Pre-requisite: There must be a MySQL instance running on port 3306 with the `heavenms` database created with all tables

If database has not been setup run the following steps

1. Run the db_database.sql file on the `heavenms` database
2. Run the db_drops.sql file on the `heavenms` database

#### Production

1. `./gradlew buildAndCopy`
2. Run `launch.bat`

#### Local Testing

Run `launchLocal.bat`

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

### References 

Server files: https://github.com/ronancpl/HeavenMS

Client files & general tools: https://drive.google.com/drive/folders/0BzDsHSr-0V4MYVJ0TWIxd05hYUk

---