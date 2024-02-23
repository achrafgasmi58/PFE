package com.bezkoder.springjwt.models;
import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "client_file")
public class ClientFile implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public ClientFile() {
    }

    public ClientFile(Long id, String numeroCIN, String nom, String prenom, String prenomDuPere, String prenomDeLaMere, String nomDeLaMere, String dateDeNaissance, String lieuDeNaissance, String profession, String adresse, String dateDeCreation) {
        this.id = id;
        this.numeroCIN = numeroCIN;
        this.nom = nom;
        this.prenom = prenom;
        this.prenomDuPere = prenomDuPere;
        this.prenomDeLaMere = prenomDeLaMere;
        this.nomDeLaMere = nomDeLaMere;
        this.dateDeNaissance = dateDeNaissance;
        this.lieuDeNaissance = lieuDeNaissance;
        this.profession = profession;
        this.adresse = adresse;
        this.dateDeCreation = dateDeCreation;
    }

    @Column(name = "numeroCIN")
    private String numeroCIN;

    @Column(name = "nom")
    private String nom;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "prenomDuPere")
    private String prenomDuPere;

    @Column(name = "prenomDeLaMere")
    private String prenomDeLaMere;

    @Column(name = "nomDeLaMere")
    private String nomDeLaMere;

    @Column(name = "dateDeNaissance")
    private String dateDeNaissance;

    @Column(name = "lieuDeNaissance")
    private String lieuDeNaissance;

    @Column(name = "profession")
    private String profession;

    @Column(name = "adresse")
    private String adresse;

    @Column(name = "dateDeCreation")
    private String dateDeCreation;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroCIN() {
        return numeroCIN;
    }

    public void setNumeroCIN(String numeroCIN) {
        this.numeroCIN = numeroCIN;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getPrenomDuPere() {
        return prenomDuPere;
    }

    public void setPrenomDuPere(String prenomDuPere) {
        this.prenomDuPere = prenomDuPere;
    }

    public String getPrenomDeLaMere() {
        return prenomDeLaMere;
    }

    public void setPrenomDeLaMere(String prenomDeLaMere) {
        this.prenomDeLaMere = prenomDeLaMere;
    }

    public String getNomDeLaMere() {
        return nomDeLaMere;
    }

    public void setNomDeLaMere(String nomDeLaMere) {
        this.nomDeLaMere = nomDeLaMere;
    }

    public String getDateDeNaissance() {
        return dateDeNaissance;
    }

    public void setDateDeNaissance(String dateDeNaissance) {
        this.dateDeNaissance = dateDeNaissance;
    }

    public String getLieuDeNaissance() {
        return lieuDeNaissance;
    }

    public void setLieuDeNaissance(String lieuDeNaissance) {
        this.lieuDeNaissance = lieuDeNaissance;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getDateDeCreation() {
        return dateDeCreation;
    }

    public void setDateDeCreation(String dateDeCreation) {
        this.dateDeCreation = dateDeCreation;
    }

}
