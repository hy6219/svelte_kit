package com.example.connect.basic;

import com.example.connect.common.constant.ResultCode;
import com.example.connect.common.constant.TestEnums;
import com.example.connect.common.dto.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import static com.example.connect.common.constant.TestEnums.*;

@RestController
public class TestController {

    private List<String> testList = new ArrayList<>(List.of(DOG.getName(),
            CAT.getName(),
            BIRD.getName()));

    @GetMapping("/api/test")
    public ApiResponse<String> test() {
        int randomIdx = (int) (Math.random() * (testList.size()));
        String result = testList.get(randomIdx);

        return ApiResponse.<String>builder()
                .setResult(result)
                .build();
    }
}
