package jjw.api.manager.enums;

public enum PaymentMethod {
    CREDIT_CARD,
    DEBIT_CARD,
    CASH,
    CHECK,
    OTHER;

    public static String mapToString(PaymentMethod method){
        return switch (method){
            case CREDIT_CARD -> "Credit Card";
            case DEBIT_CARD -> "Debit Card";
            case CASH -> "Cash";
            case CHECK -> "Check";
            case OTHER -> "Unspecified Method";
        };
    }
}
