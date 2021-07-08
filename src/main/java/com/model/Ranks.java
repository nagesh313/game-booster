package com.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Ranks {
    @Id
    private String id;
    private String name;
    private String tiers;
    private String imageURL;

}
