function check(){
	var name = document.getElementById("name").value;
	var psw = document.getElementById("password").value;

	if(name == ""){
		alert("用户名不能为空！");
		return false;
	}else if(psw == ""){
		alert("密码不能为空！");
		return false;
	}else if(name == "admin" && psw == "123456"){
		return true;
	}else if(name != "admin" && psw != "123456"){
		alert("登录名、密码错误！");
		return false;
	}else if(name != "admin"){
		alert("登陆名错误！");
		return false;
	}else{
		alert("密码错误！");
		return false;

	}
}