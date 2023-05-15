package jjw.api.manager.configuration;

import jakarta.annotation.PostConstruct;
import jjw.api.manager.entity.User;
import jjw.api.manager.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
@AllArgsConstructor
public class DefaultUserConfiguration {

    @Autowired
    private final UserService userService;

    @PostConstruct
    public void saveDefaultUser(){
        if(userService.userExists("default")) return;
        userService.saveNewUser(new User("default", "password"));
    }
}
