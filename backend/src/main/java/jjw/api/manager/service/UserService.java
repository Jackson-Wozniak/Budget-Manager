package jjw.api.manager.service;

import jjw.api.manager.entity.User;
import jjw.api.manager.exception.UserCreationException;
import jjw.api.manager.exception.UserNotFoundException;
import jjw.api.manager.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    @Autowired
    private final UserRepository userRepository;

    public User findUserByName(String username){
        return userRepository.findById(username).orElseThrow(
                () -> new UserNotFoundException("No user exists with name " + username));
    }

    public User saveNewUser(User user){
        if(userExists(user.getUsername()) || user.getPassword() == null) throw new UserCreationException("That username is taken");
        return userRepository.save(user);
    }

    public User findDefaultUser() throws Exception{
        return userRepository.findById("default").orElseThrow(
                () -> new Exception("The default user does not exist, application must restart"));
    }

    public User updateUser(User user){
        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findById(username).orElseThrow(
                () -> new UserNotFoundException("No user exists with name " + username));
    }

    public boolean userExists(String username){
        return this.userRepository.findById(username).isPresent();
    }
}
