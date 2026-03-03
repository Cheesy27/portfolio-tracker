package com.fcproject.portfolio_tracker.controller;

import com.fcproject.portfolio_tracker.service.StockService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stock")
@CrossOrigin(origins = "http://localhost:3000")
public class StockController {

    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @GetMapping("/{symbol}")
    public ResponseEntity<Double> getStockPrice(@PathVariable String symbol) {
        Double price = stockService.getStockPrice(symbol);
        if (price != null) {
            return ResponseEntity.ok(price);
        }
        return ResponseEntity.notFound().build();
    }
}