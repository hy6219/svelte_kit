package com.example.connect.common.dto;

import com.example.connect.common.constant.ResultCode;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
public class ApiResponse<E> implements Serializable {

    static final long serialVersionUID = 123456789012L;

    private String code;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @Setter
    private String message;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @Setter
    private E result;

    private ApiResponse(Builder<E> builder){
        this.code = builder.code;
        this.setResult(builder.getResult());
        this.message = builder.getMessage();
    }

    public static <E> Builder<E> builder(){return new Builder<>();}
    public static <E> Builder<E> builder(String code){return new Builder<>(code);}

    @Getter
    public static class Builder<E> {

        private E result;
        private String code;
        private String message;


        public Builder() {
            this.code = ResultCode.SUCCESS;
        }

        public Builder(String code) {
            this.code = code;
        }

        public Builder<E> setMessage(String message){
            this.message = message;
            return this;
        }

        public Builder<E> setResult(E result){
            this.result = result;
            return this;
        }

        public ApiResponse<E> build(){
            return new ApiResponse<>(this);
        }
    }
}
