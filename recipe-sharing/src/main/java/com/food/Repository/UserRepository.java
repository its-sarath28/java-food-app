package com.food.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.food.Model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    public User findByEmail(String email);
}
