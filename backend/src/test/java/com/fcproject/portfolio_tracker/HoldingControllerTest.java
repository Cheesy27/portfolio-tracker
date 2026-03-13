package com.fcproject.portfolio_tracker;

import com.fcproject.portfolio_tracker.controller.HoldingController;
import com.fcproject.portfolio_tracker.model.Holding;
import com.fcproject.portfolio_tracker.service.HoldingService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class HoldingControllerTest {

    @Mock
    private HoldingService holdingService;

    @InjectMocks
    private HoldingController holdingController;

    @Test
    void getHoldings_returns200() {
        Holding h1 = new Holding();
        h1.setSymbol("AAPL");
        h1.setName("Apple Inc");
        h1.setQuantity(10);
        h1.setPurchasePrice(150.00);

        when(holdingService.getAllHoldings()).thenReturn(Arrays.asList(h1));

        ResponseEntity<List<Holding>> response = holdingController.getAllHoldings();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().size());
    }

    @Test
    void addHolding_returns201() {
        Holding newHolding = new Holding();
        newHolding.setSymbol("MSFT");
        newHolding.setName("Microsoft");
        newHolding.setQuantity(3);
        newHolding.setPurchasePrice(300.00);

        when(holdingService.addHolding(newHolding)).thenReturn(newHolding);

        ResponseEntity<Holding> response = holdingController.addHolding(newHolding);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("MSFT", response.getBody().getSymbol());
    }

    @Test
    void deleteHolding_returns204() {
        doNothing().when(holdingService).deleteHolding(1L);

        ResponseEntity<Void> response = holdingController.deleteHolding(1L);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }
}