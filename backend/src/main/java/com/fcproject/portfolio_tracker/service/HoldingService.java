package com.fcproject.portfolio_tracker.service;

import com.fcproject.portfolio_tracker.model.Holding;
import com.fcproject.portfolio_tracker.repository.HoldingRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HoldingService {

    private final HoldingRepository holdingRepository;

    public HoldingService(HoldingRepository holdingRepository) {
        this.holdingRepository = holdingRepository;
    }

    public List<Holding> getAllHoldings() {
        return holdingRepository.findAll();
    }

    public Holding addHolding(Holding holding) {
        return holdingRepository.save(holding);
    }

    public void deleteHolding(Long id) {
        holdingRepository.deleteById(id);
    }
}