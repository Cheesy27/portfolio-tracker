package com.fcproject.portfolio_tracker;

import com.fcproject.portfolio_tracker.model.Holding;
import com.fcproject.portfolio_tracker.repository.HoldingRepository;
import com.fcproject.portfolio_tracker.service.HoldingService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class HoldingServiceTest {

    @Mock
    private HoldingRepository holdingRepository;

    @InjectMocks
    private HoldingService holdingService;

    @Test
    void getAllHoldings_returnsAllHoldings() {
        // ARRANGE - set up fake data
        Holding h1 = new Holding(1L, "AAPL", "Apple Inc", 10, 150.00D);
        Holding h2 = new Holding(2L, "GOOG", "Alphabet Inc", 5, 2800.00D);
        when(holdingRepository.findAll()).thenReturn(Arrays.asList(h1, h2));

        // ACT - call the method
        List<Holding> result = holdingService.getAllHoldings();

        // ASSERT - check the result
        assertEquals(2, result.size());
        assertEquals("AAPL", result.get(0).getSymbol());
    }

    @Test
    void addHolding_savesAndReturnsHolding() {
        // ARRANGE
        Holding newHolding = new Holding(null, "MSFT", "Microsoft", 3, 300.00D);
        Holding savedHolding = new Holding(3L, "MSFT", "Microsoft", 3, 300.00);
        when(holdingRepository.save(newHolding)).thenReturn(savedHolding);

        // ACT
        Holding result = holdingService.addHolding(newHolding);

        // ASSERT
        assertNotNull(result.getId());
        assertEquals("MSFT", result.getSymbol());
    }

    @Test
    void deleteHolding_callsRepositoryDelete() {
        // ACT
        holdingService.deleteHolding(1L);

        // ASSERT - verify delete was called with the right ID
        verify(holdingRepository, times(1)).deleteById(1L);
    }
}