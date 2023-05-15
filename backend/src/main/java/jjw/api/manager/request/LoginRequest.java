package jjw.api.manager.request;

import jjw.api.manager.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginRequest {

    private final String username;
    private final String password;

    public User createUser(){
        return new User(this.username, this.password);
    }
}
