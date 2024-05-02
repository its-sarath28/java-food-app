package com.food.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.food.Config.JwtProvider;
import com.food.Model.User;
import com.food.Repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    public User findUserById(Long userId) throws Exception {
        Optional<User> opt = userRepository.findById(userId);

        if (opt.isPresent()) {
            return opt.get();
        } else {
           throw new Exception("User not found"); 
        }
    }

    @Override
    public User findUserByJwt(String jwt) throws Exception {
        
        String email = jwtProvider.getEmailFromJwtToken(jwt);

        if (email == null) {
            throw new Exception("User not found");
        }

        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new Exception("User not found");
        }

        return user;
    }
}
