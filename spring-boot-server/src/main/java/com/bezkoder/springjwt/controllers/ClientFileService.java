package com.bezkoder.springjwt.controllers;
import com.bezkoder.springjwt.models.ClientFile;
import com.bezkoder.springjwt.repository.ClientFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientFileService {

    private final ClientFileRepository clientFileRepository;

    @Autowired
    public ClientFileService(ClientFileRepository clientFileRepository) {
        this.clientFileRepository = clientFileRepository;
    }

    // Create or Update a ClientFile
    public ClientFile saveClientFile(ClientFile clientFile) {
        return clientFileRepository.save(clientFile);
    }

    // Read all ClientFiles
    public List<ClientFile> findAllClientFiles() {
        return clientFileRepository.findAll();
    }

    // Read a single ClientFile by ID
    public ClientFile findClientFileById(Long id) {
        return clientFileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ClientFile not found"));
    }

    // Update a ClientFile
    public ClientFile updateClientFile(Long id, ClientFile clientFileDetails) {
        ClientFile clientFile = findClientFileById(id);
        clientFile.setNumeroCIN(clientFileDetails.getNumeroCIN());
        clientFile.setNom(clientFileDetails.getNom());
        clientFile.setPrenom(clientFileDetails.getPrenom());
        clientFile.setPrenomDuPere(clientFileDetails.getPrenomDuPere());
        clientFile.setPrenomDeLaMere(clientFileDetails.getPrenomDeLaMere());
        clientFile.setNomDeLaMere(clientFileDetails.getNomDeLaMere());
        clientFile.setDateDeNaissance(clientFileDetails.getDateDeNaissance());
        clientFile.setDateDeCreation(clientFileDetails.getDateDeCreation());
        clientFile.setAdresse(clientFileDetails.getAdresse());
        clientFile.setProfession(clientFileDetails.getProfession());
        // ... set other fields
        return clientFileRepository.save(clientFile);
    }

    // Delete a ClientFile
    public void deleteClientFile(Long id) {
        ClientFile clientFile = findClientFileById(id);
        clientFileRepository.delete(clientFile);
    }
}
