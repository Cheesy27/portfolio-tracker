package com.fcproject.portfolio_tracker.controller;

import com.fcproject.portfolio_tracker.model.Holding;
import com.fcproject.portfolio_tracker.service.HoldingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/holdings")
@CrossOrigin(origins = "http://localhost:3000")
public class HoldingController {

    private final HoldingService holdingService;

    public HoldingController(HoldingService holdingService) {
        this.holdingService = holdingService;
    }

    @GetMapping
    public ResponseEntity<List<Holding>> getAllHoldings() {
        return ResponseEntity.ok(holdingService.getAllHoldings());
    }

    @PostMapping
    public ResponseEntity<Holding> addHolding(@RequestBody Holding holding) {
        return ResponseEntity.status(HttpStatus.CREATED).body(holdingService.addHolding(holding));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHolding(@PathVariable Long id) {
        holdingService.deleteHolding(id);
        return ResponseEntity.noContent().build();
    }
}