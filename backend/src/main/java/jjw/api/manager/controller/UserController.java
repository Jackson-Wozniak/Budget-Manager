package jjw.api.manager.controller;

import jjw.api.manager.dto.UserDTO;
import jjw.api.manager.entity.User;
import jjw.api.manager.request.LoginRequest;
import jjw.api.manager.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/v1/user")
@AllArgsConstructor
public class UserController {

    @Autowired
    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> createNewUser(@RequestBody LoginRequest request){
        try{
            User user = userService.saveNewUser(request.createUser());
            return ResponseEntity.ok("Created User");
        }catch(Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
