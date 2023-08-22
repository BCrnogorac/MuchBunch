﻿using System.ComponentModel.DataAnnotations;

namespace MuchBunch.EF.Database.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string HashedPassword { get; set; }
        [Required]
        public string Role { get; set; }
        [Required]
        public string Email { get; set; }
    }
}
