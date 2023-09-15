package ru.kata.spring.boot_security.demo.Exception;

import org.springframework.dao.DataIntegrityViolationException;

public class UserUsernameExistsException extends DataIntegrityViolationException {
    public UserUsernameExistsException (String msg) {
        super (msg);
    }
}
