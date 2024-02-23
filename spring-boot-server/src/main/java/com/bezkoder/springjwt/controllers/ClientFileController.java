package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.ClientFile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/client-files")
public class ClientFileController {

    private final ClientFileService clientFileService;

    @Autowired
    public ClientFileController(ClientFileService clientFileService) {
        this.clientFileService = clientFileService;
    }

    // Create or update a ClientFile
    @PostMapping("/")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ClientFile> createOrUpdateClientFile(@RequestBody ClientFile clientFile) {
        ClientFile savedClientFile = clientFileService.saveClientFile(clientFile);
        return ResponseEntity.ok(savedClientFile);
    }

    // Get all ClientFiles
    @GetMapping("/")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ClientFile>> getAllClientFiles() {
        List<ClientFile> clientFiles = clientFileService.findAllClientFiles();
        return ResponseEntity.ok(clientFiles);
    }

    // Get a single ClientFile by ID
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ClientFile> getClientFileById(@PathVariable Long id) {
        ClientFile clientFile = clientFileService.findClientFileById(id);
        return ResponseEntity.ok(clientFile);
    }

    // Update a ClientFile
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ClientFile> updateClientFile(@PathVariable Long id, @RequestBody ClientFile clientFile) {
        ClientFile updatedClientFile = clientFileService.updateClientFile(id, clientFile);
        return ResponseEntity.ok(updatedClientFile);
    }

    // Delete a ClientFile
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteClientFile(@PathVariable Long id) {
        clientFileService.deleteClientFile(id);
        return ResponseEntity.ok().build();
    }
}
