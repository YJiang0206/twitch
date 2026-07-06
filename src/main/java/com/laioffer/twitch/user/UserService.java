package com.laioffer.twitch.user;


// imports...


import com.laioffer.twitch.db.UserRepository;
import com.laioffer.twitch.db.entity.UserEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class UserService {


    private final UserDetailsManager userDetailsManager;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;


    public UserService(UserDetailsManager userDetailsManager, PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.userDetailsManager = userDetailsManager;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }


    @Transactional
    public void register(String username, String password, String firstName, String lastName) {
        UserDetails user = User.builder() //UserDetail is Spring exist class
                .username(username)
                .password(passwordEncoder.encode(password))
                .roles("USER") // categorize into different type of user
                .build();
        userDetailsManager.createUser(user);//Spring defined user manager to help us create username and passport
        userRepository.updateNameByUsername(username, firstName, lastName);//we add what we care
    }


    public UserEntity findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
