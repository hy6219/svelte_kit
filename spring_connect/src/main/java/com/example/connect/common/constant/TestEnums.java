package com.example.connect.common.constant;

import lombok.Getter;

public enum TestEnums {
    DOG("강아지"),
    CAT("고양이"),
    BIRD("새");
    
    @Getter 
    private String name;

    TestEnums(String name) {
        this.name = name;
    }
}
