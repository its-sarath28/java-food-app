package com.food.Service;

import com.food.Model.User;

public interface UserService {
    public User findUserById(Long userId) throws Exception;
    public User findUserByJwt(String jwt) throws Exception;
}
