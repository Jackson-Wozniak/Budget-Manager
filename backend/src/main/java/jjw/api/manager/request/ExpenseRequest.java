package jjw.api.manager.request;

import jjw.api.manager.enums.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ExpenseRequest {

    private String description;
    private double value;
    private String paymentMethod;
    private String categoryName;
    private String month;
}
