package com.Algocorner.rest.webservices.restfulwebservices.Todo;

import java.net.URI;
import java.util.List;

import javax.servlet.Servlet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.Algocorner.rest.webservices.restfulwebservices.Todo.Todo;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class TodoResource {
	
	@Autowired
	private TodoHardcodedService TodoService;

	//GET
	@GetMapping("/users/{username}/todos")
	public List<Todo> getAllTodos(@PathVariable String username){
		//Thread.sleep(3000);
		return TodoService.findAll();
	}
	
	//GET
		@GetMapping("/users/{username}/todos/{id}")
		public Todo getTodo(@PathVariable String username,@PathVariable long id){
			//Thread.sleep(3000);
			return TodoService.findById(id);
		}
	
		//Delete
	@DeleteMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String username,@PathVariable long id){
		
		Todo todo= TodoService.deleteById(id);
		
		if(todo!=null) {
			return ResponseEntity.noContent().build();
		}
		
		return ResponseEntity.notFound().build();
		
		}
	
	//Update
	@PutMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable String username,@PathVariable long id,@RequestBody Todo todo){
		Todo todoupdate=TodoService.save(todo);
		return new ResponseEntity<Todo>(todo,HttpStatus.OK);
	}
	
	//add
	@PostMapping("/users/{username}/todos")
	public ResponseEntity<Void> updateTodo(@PathVariable String username,@RequestBody Todo todo){
		Todo createdTodo=TodoService.save(todo);
		
		URI uri=ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdTodo.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
}
