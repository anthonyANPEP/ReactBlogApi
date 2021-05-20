<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ORM\Table(name="`user`")
 * @UniqueEntity("email",message="L'adresse email est déjà utilisé.")
 * @ApiResource(
 *      collectionOperations={"GET","POST"},
 *      itemOperations= {"GET", "PUT", "DELETE"},
 *      subresourceOperations={
 *              "posts_get_subresource"={
 *                  "path"="/blogeur/{id}/articles"
 *              }
 * },
 *      normalizationContext = {
 *          "groups"={"user_read"}
 * })
 * 
 */
class User implements UserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"posts_read","user_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"posts_read","user_read"})
     * @Assert\NotBlank(
     *      message="L'email est obligatoire pour s'incrire."
     * )
     * @Assert\Email(
     *      message="Veuillez renseigner un e-mail correct."
     * )
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = ['ROLE_USER'];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Assert\NotBlank(
     *      message="Le mot de passe est obligatoire."
     * )
     * @Assert\Length(
     *      min=6,
     *      minMessage="Le mot de passe doit faire 6 caractères minimum."
     * )
     */
    private $password;

    /**
     * @ORM\OneToMany(targetEntity=Post::class, mappedBy="author", cascade={"persist", "remove"})
     * @Groups({"user_read"})
     * @ApiSubresource()
     */
    private $posts;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"posts_read","user_read"})
     * @Assert\NotBlank(
     *      message="Le pseudo est obligatoire."
     * )
     */
    private $pseudo;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"posts_read","user_read"})
     * @Assert\NotBlank(
     *      message="Le nom de famille est obligatoire."
     * )
     * @Assert\Length(
     *      min=3,
     *      minMessage="Votre nom de famille doit faire 3 caractères minimum."
     * )
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"posts_read","user_read"})
     * @Assert\NotBlank(
     *      message="Le prénom est obligatoire."
     * )
     * @Assert\Length(
     *      min=3,
     *      minMessage="Votre prénom doit faire 3 caractères minimum."
     * )
     */
    private $firstname;

    public function __construct()
    {
        $this->posts = new ArrayCollection();
    }

    /**
     * Permet de compter le nombre de post écrit par un utilisateur
     * @Groups({"user_read"})
     * @return integer
     */
    public function getTotalPost(): int {

        $countPosts = count($this->posts->toArray());

        return  $countPosts;
    }
    
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return Collection|Post[]
     */
    public function getPosts(): Collection
    {
        return $this->posts;
    }

    public function addPost(Post $post): self
    {
        if (!$this->posts->contains($post)) {
            $this->posts[] = $post;
            $post->setAuthor($this);
        }

        return $this;
    }

    public function removePost(Post $post): self
    {
        if ($this->posts->removeElement($post)) {
            // set the owning side to null (unless already changed)
            if ($post->getAuthor() === $this) {
                $post->setAuthor(null);
            }
        }

        return $this;
    }

    public function setPseudo(string $pseudo): self
    {
        $this->pseudo = $pseudo;

        return $this;
    }

    public function getPseudo(): ?string
    {
        return $this->pseudo;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }
}
