package com.example.jogodamemoriaapp.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity //Define que a classe Jogador é uma entidade do banco de dados.
public class Jogador {

    @Id //Marca o campo id como a chave primária da tabela.
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Configura a geração automática dos IDs.
    private Long id;

    private String nome; //nome do jogador
    private int tempo; //tempo do jogador
    private String nivel; // nivel de dificuldade

    public Jogador() {
    }

    public Jogador(String nome, int tempo, String nivel) {
        this.nome = nome;
        this.tempo = tempo;
        this.nivel = nivel;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getTempo() {
        return tempo;
    }

    public void setTempo(int tempo) {
        this.tempo = tempo;
    }

    public String getNivel() {
        return nivel;
    }

    public void setNivel(String nivel) {
        this.nivel = nivel;
    }
}
