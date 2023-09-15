package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.Exception.ExceptionInfo;
import ru.kata.spring.boot_security.demo.Exception.UserUsernameExistsException;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.PersonDetailsService;
import ru.kata.spring.boot_security.demo.services.RoleServiceImpl;
import ru.kata.spring.boot_security.demo.services.UserServiceImpl;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.security.Principal;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
public class AdminController {

    private final UserServiceImpl userService;
    private final RoleServiceImpl roleService;
    private final PasswordEncoder passwordEncoder;

    private final PersonDetailsService personDetailsService;

    @Autowired
    public AdminController(UserServiceImpl userService, RoleServiceImpl roleService, PasswordEncoder passwordEncoder,
                           PersonDetailsService personDetailsService) {
        this.userService = userService;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
        this.personDetailsService = personDetailsService;
    }

//        @GetMapping("/admin")
//    public String showAllUsers (Principal principal, Model model) {
//        model.addAttribute("users", userService.findAllUsers());
//        model.addAttribute("user", personDetailsService.findByUsername(principal.getName()));
//        model.addAttribute("roles", roleService.findByIdRoles());
//        return "users";
//    }

//    @GetMapping("/get_user/{id}")
//    public ResponseEntity<User> getUser(@PathVariable("id") long id) {
//        //userService.removeUser(id);
//        System.out.println("looking for user");
//
//        return new ResponseEntity<>(personDetailsService.findByUsername("sergey"), HttpStatus.OK);
//    }

     @GetMapping("/getUser/{id}")
     public User getUser(@PathVariable("id") long id) {
        return userService.getUserById(id);
     }


    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return new ResponseEntity<>(userService.findAllUsers(), HttpStatus.OK);
    }

    //This works
    @PostMapping("users/add")
    public ResponseEntity<ExceptionInfo> createUser(@RequestBody User user) {

        try {
//            Set<Role> roles = new HashSet<>(roleService.getRolesById(ids));//correct here
//             user.setRoles(roles);
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userService.saveUser(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (UserUsernameExistsException u) {
            throw new UserUsernameExistsException("User with username exists");
        }
    }


    //This works
    @DeleteMapping("/users/delete/{id}")
    public ResponseEntity<ExceptionInfo> pageDelete(@PathVariable("id") long id) {
        userService.removeUser(id);
        return new ResponseEntity<>(new ExceptionInfo("User deleted"), HttpStatus.OK);
    }
//    @PutMapping("/users/update/{id}")
//    @ResponseStatus(HttpStatus.OK)
//    public User editUser(@PathVariable("id") long id, @RequestBody User user) {
//        return userService.updateUser(id, user);
//    }


    @PutMapping("/users/update/{id}")
    public ResponseEntity<ExceptionInfo> pageEdit(@PathVariable("id") long id,
                                                  @RequestBody User user) {

        try {
            String oldPassword = userService.getUserById(id).getPassword();
            if (oldPassword.equals(user.getPassword())) {
                System.out.println("TRUE");
//                Set<Role> roles = new HashSet<>(roleService.getRolesById(Collections.singletonList(2)));
//                user.setRoles(roles);
                user.setPassword(oldPassword);
                userService.updateUser(user);
            } else {
                System.out.println("FALSE");
//                Set<Role> roles = new HashSet<>(roleService.getRolesById(Collections.singletonList(2)));//correct here!!
//                user.setRoles(roles);
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                userService.saveUser(user);
            }
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (UserUsernameExistsException u) {
            throw new UserUsernameExistsException("User with username exists");
        }
    }
}




//@GetMapping("/add")
//public String pageCreateUser (Model model, Principal principal) {
//    model.addAttribute("user", personDetailsService.findByUsername(principal.getName()));
//    model.addAttribute("listRoles", roleService.findByIdRoles());
//    return "create";
//}
//
//    @PostMapping("/new")
//    public String pageCreate(@ModelAttribute("user")
//                             @Valid User user, BindingResult bindingResult,
//                             @RequestParam("listRoles") List<Integer> roleIds) {
//        if (bindingResult.hasErrors()) {
//            return "create";
//        }
//        if (personDetailsService.findByUsername(user.getUsername()) != null) {
//            bindingResult.addError(new FieldError("username", "username",
//                    String.format("User with name \"%s\" already exists!", user.getUsername())));
//            return "create";
//        }
//        Set<Role> roles = new HashSet<>(roleService.getRolesById(roleIds));
//        user.setRoles(roles);
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        userService.saveUser(user);
//        return "redirect:/admin";
//    }
//
//    @DeleteMapping("/{id}/delete")
//    public String pageDelete(@PathVariable("id") long id) {
//        userService.removeUser(id);
//        return "redirect:/admin";
//    }
//
//    @GetMapping("/{id}/update")
//    public String pageEditUser(@PathVariable("id") long id, Model model) {
//        model.addAttribute("user",userService.getUserById(id));
//        model.addAttribute("listRoles", roleService.getAllRoles());
//        return "users";
//    }
//
//    @PutMapping("/{id}/update")
//    public String pageEdit(@Valid User user, BindingResult bindingResult,
//                           @RequestParam("listRoles") List<Integer>roleIds) {
//        if (bindingResult.hasErrors()) {
//            return "redirect:/admin";
//        }
//        Set<Role> roles = new HashSet<>(roleService.getRolesById(roleIds));
//        user.setRoles(roles);
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        userService.updateUser(user);
//        return "redirect:/admin";
//    }


