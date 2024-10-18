package com.example.jogodamemoriaapp.controllers;

import com.example.jogodamemoriaapp.models.Jogador;
import com.example.jogodamemoriaapp.repositories.JogadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class JogoController {

    @Autowired
    private JogadorRepository jogadorRepository;

    @GetMapping("/")
    public String index() {
        return "index"; // Renderiza o index.html
    }

    @GetMapping("/iniciar-jogo")
    public String iniciarJogo(@RequestParam String nome, @RequestParam String dificuldade, Model model) {
        model.addAttribute("nome", nome);
        model.addAttribute("dificuldade", dificuldade);
        return "jogo"; // Redireciona para a página do jogo
    }

    @GetMapping("/rankings")
    public String rankings(Model model) {
        List<Jogador> ranking = jogadorRepository.findAllByOrderByTempoAsc();
        ranking.forEach(jogador -> System.out.println("Jogador: " + jogador.getNome() + ", Tempo: " + jogador.getTempo() + ", Nível: " + jogador.getNivel()));
        model.addAttribute("ranking", ranking);
        return "rankings";
    }

    @PostMapping("/salvar-resultado")
    public String salvarResultado(@RequestParam String nome, @RequestParam(required = false) Integer tempo, @RequestParam String nivel) {
        if (tempo == null) {
            // Trate o caso de tempo vazio ou nulo, talvez definir um valor padrão ou retornar um erro ao usuário
            tempo = 0; // Exemplo de valor padrão
        }
        // Log para verificar os valores recebidos
        System.out.println("Recebendo resultado:");
        System.out.println("Nome: " + nome);
        System.out.println("Tempo: " + tempo);
        System.out.println("Nível: " + nivel);


        Jogador jogador = new Jogador(nome, tempo, nivel);
        jogadorRepository.save(jogador);
        return "redirect:/rankings";
    }
}