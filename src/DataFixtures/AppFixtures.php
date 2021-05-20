<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Post;
use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder ;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');
        $role[] = "ROLE_USER";

        for ($i=0; $i < 5; $i++) { 
            
            $user = new User();
    
            $hash = $this->encoder->encodePassword($user, 'password');
    
            $user->setPseudo($faker->userName)
                    ->setEmail($faker->email)
                    ->setPassword($hash)
                    ->setRoles($role)
                    ->setLastname($faker->lastName)
                    ->setFirstname($faker->firstName);
    
            $manager->persist($user);

            for ($j=0; $j < mt_rand(5,10) ; $j++) { 
                
                $post = new Post();

                $post->setTitle($faker->sentence(3))
                    ->setContent($faker->paragraph)
                    ->setSendAt($faker->dateTimeBetween('-6 months'))
                    ->setAuthor($user);

                    $manager->persist($post);
            }
        }

        $manager->flush();
    }
}
