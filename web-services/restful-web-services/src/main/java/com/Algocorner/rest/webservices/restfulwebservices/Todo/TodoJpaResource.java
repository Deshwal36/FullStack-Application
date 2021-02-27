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
public class TodoJpaResource {
	
	@Autowired
	private TodoHardcodedService TodoService;
	
	@Autowired
	private TodoJpaRepository todoJpaRepository;
	//GET
	@GetMapping("/jpa/users/{username}/todos")
	public List<Todo> getAllTodos(@PathVariable String username){
		//Thread.sleep(3000);
		return todoJpaRepository.findByUsername(username);
		//return TodoService.findAll();
	}
	
	//GET
		@GetMapping("/jpa/users/{username}/todos/{id}")
		public Todo getTodo(@PathVariable String username,@PathVariable long id){
			//Thread.sleep(3000);
			return todoJpaRepository.findById(id).get();
			//return TodoService.findById(id);
		}
	
		//Delete
	@DeleteMapping("/jpa/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String username,@PathVariable long id){
		
		 todoJpaRepository.deleteById(id);
		
		
			return ResponseEntity.noContent().build();
		
		}
	
	//Update
	@PutMapping("/jpa/users/{username}/todos/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable String username,@PathVariable long id,@RequestBody Todo todo){
		todo.setUsername(username);
		Todo todoupdate=todoJpaRepository.save(todo);
		return new ResponseEntity<Todo>(todo,HttpStatus.OK);
	}
	
	//add
	@PostMapping("/jpa/users/{username}/todos")
	public ResponseEntity<Void> createTodo(@PathVariable String username,@RequestBody Todo todo){
		todo.setUsername(username);
		Todo createdTodo=todoJpaRepository.save(todo);
		
		URI uri=ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdTodo.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
}
