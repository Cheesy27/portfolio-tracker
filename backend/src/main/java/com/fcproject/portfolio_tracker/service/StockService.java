package com.fcproject.portfolio_tracker.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Map;

@Service
public class StockService {

    @Value("${alphavantage.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public Double getStockPrice(String symbol) {
        String url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" 
                     + symbol + "&apikey=" + apiKey;

        Map response = restTemplate.getForObject(url, Map.class);

        if (response != null && response.containsKey("Global Quote")) {
            Map globalQuote = (Map) response.get("Global Quote");
            String price = (String) globalQuote.get("05. price");
            if (price != null && !price.isEmpty()) {
                return Double.parseDouble(price);
            }
        }
        return null;
    }
}