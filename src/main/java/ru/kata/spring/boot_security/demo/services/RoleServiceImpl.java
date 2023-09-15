package ru.kata.spring.boot_security.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class RoleServiceImpl implements RoleService {

   private final RoleRepository roleRepository;

   @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {//
        this.roleRepository = roleRepository;
    }

    public List<Role> findByIdRoles() {
        return roleRepository.findAll();
    }

    public List<Role> getRolesById(List<Integer> ids) {
       return roleRepository.findByIdIn(ids);
    }

    public List<Role> getAllRoles() {
       return roleRepository.findAll();
    }
}
