package com.example.jogodamemoriaapp.repositories;

import com.example.jogodamemoriaapp.models.Jogador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface JogadorRepository extends JpaRepository<Jogador, Long> {

    //Metodo para ordenar os jogadores em ordem crescente de tempo
    List<Jogador> findAllByOrderByTempoAsc();

}
