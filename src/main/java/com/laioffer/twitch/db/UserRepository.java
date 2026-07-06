package com.laioffer.twitch.db;


// imports...


import com.laioffer.twitch.db.entity.UserEntity;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.ListCrudRepository;


import java.util.List;


public interface UserRepository extends ListCrudRepository<UserEntity, Long> {

    //use the method name to
    List<UserEntity> findByLastName(String lastName);


    List<UserEntity> findByFirstName(String firstName);


    UserEntity findByUsername(String username);

    //for more complex query, we write it down by our self
    @Modifying
    @Query("UPDATE users SET first_name = :firstName, last_name = :lastName WHERE username = :username")
    void updateNameByUsername(String username, String firstName, String lastName);
}
