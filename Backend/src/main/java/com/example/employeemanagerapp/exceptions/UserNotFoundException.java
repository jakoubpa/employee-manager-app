package com.example.employeemanagerapp.exceptions;

/**
 * Exception thrown to indicate that a user was not found in the system.
 * This is a runtime exception, typically used to handle scenarios where
 * an expected user entity is not present in the data store.
 */
public class UserNotFoundException extends RuntimeException {

    /**
     * Constructs a new {@code UserNotFoundException} with the specified detail message.
     *
     * @param message the detail message (which is saved for later retrieval by the {@link #getMessage()} method).
     */
    public UserNotFoundException(String message) {
        super(message);
    }
}
