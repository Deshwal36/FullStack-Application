package com.Algocorner.rest.webservices.restfulwebservices.helloworld;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

//Controller
@RestController
@CrossOrigin(origins="http://localhost:4200")
public class HelloWorldController {
	
	//GET
	//URI : /hello-world
	//method : "Hello world"
	
	//@RequestMapping(method=RequestMethod.GET, path="/hello")
	@GetMapping(path="/hello-World")
	public String helloWorld() {
		return "Hello world";
	}
	
	//hello-World-bean
	@GetMapping(path="/hello-World-bean")
	public HelloWorldBean helloWorldBean() {
		return new HelloWorldBean("Hello world Bean");
	}
	//hello/path-variable/Algocorner
	@GetMapping(path="/hello-world/path-variable/{name}")
	public HelloWorldBean helloWorldBean(@PathVariable String name) {
		//throw new RuntimeException("Somethings is fissy");
		return new HelloWorldBean(String.format("Hello, %s", name));
	}
}
