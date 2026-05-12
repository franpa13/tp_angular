import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from './interfaces/card.type';

@Component({
  selector: 'app-punto3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './punto3.html',
  styleUrls: ['./punto3.css'],
})
export class Punto3 {
  private readonly EMOJIS = ['🍎', '🌟', '🎵', '🎮', '🏆', '🚀'];
  readonly TOTAL_ATTEMPTS = 10;

  gameStarted = false;
  gameOver = false;
  won = false;
  attempts = this.TOTAL_ATTEMPTS;
  cards: Card[] = [];
  flippedCards: Card[] = [];
  canFlip = false;
  checking = false;

  get matchedPairs(): number {
    return this.cards.filter(c => c.isMatched).length / 2;
  }

  iniciar(): void {
    this.gameStarted = true;
    this.gameOver = false;
    this.won = false;
    this.attempts = this.TOTAL_ATTEMPTS;
    this.flippedCards = [];
    this.canFlip = false;
    this.checking = false;
    this.buildCards();
  }

  reiniciar(): void {
    this.gameStarted = false;
    this.gameOver = false;
    this.won = false;
    this.attempts = this.TOTAL_ATTEMPTS;
    this.flippedCards = [];
    this.canFlip = false;
    this.checking = false;
    this.cards = [];
  }

  intentar(): void {
    if (!this.gameStarted || this.gameOver || this.canFlip || this.checking) return;
    this.flippedCards = [];
    this.canFlip = true;
  }

  flipCard(card: Card): void {
    if (!this.canFlip || this.checking) return;
    if (card.isFlipped || card.isMatched) return;
    if (this.flippedCards.length >= 2) return;

    card.isFlipped = true;
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      this.canFlip = false;
      this.checking = true;
      this.checkMatch();
    }
  }

  private checkMatch(): void {
    const [a, b] = this.flippedCards;
    if (a.pairId === b.pairId) {
      a.isMatched = true;
      b.isMatched = true;
      this.flippedCards = [];
      this.checking = false;
      this.checkVictory();
    } else {
      setTimeout(() => {
        a.isFlipped = false;
        b.isFlipped = false;
        this.flippedCards = [];
        this.attempts--;
        this.checking = false;
        if (this.attempts <= 0) {
          this.gameOver = true;
          this.won = false;
        }
      }, 1000);
    }
  }

  private checkVictory(): void {
    if (this.cards.every(c => c.isMatched)) {
      this.gameOver = true;
      this.won = true;
    }
  }

  trackCard(_: number, card: Card): number {
    return card.id;
  }

  private buildCards(): void {
    const pairs: Card[] = [];
    this.EMOJIS.forEach((emoji, i) => {
      pairs.push({ id: i * 2, pairId: i, emoji, isFlipped: false, isMatched: false });
      pairs.push({ id: i * 2 + 1, pairId: i, emoji, isFlipped: false, isMatched: false });
    });
    this.cards = pairs.sort(() => Math.random() - 0.5);
  }
}
