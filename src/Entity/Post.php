<?php

namespace App\Entity;

use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\PostRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass=PostRepository::class)
 * @ApiResource(
 *      collectionOperations={"GET"={"path"="/allposts"},"POST"},
 *      itemOperations={"GET"={"path"="/post/{id}"},"DELETE","PUT"},
 *      normalizationContext = {
 *          "groups"={"posts_read"}
 * },
 *      attributes={
 *           "pagination_enabled"=true,
 *           "order"={"sendAt":"DESC"}
 *           }
 *)
 * @ApiFilter(
 *      SearchFilter::class,
 *      properties={
 *           "title"= "partial",
 *           "author.lastname"="partial",
 *           "author.firstname"="partial"}
 *)
 */
class Post
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"posts_read","user_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"posts_read","user_read"})
     * @Assert\NotBlank(
     *      message="Le titre est obligatoire pour créer un article." 
     * )
     * @Assert\Length(
     *      min=3,
     *      minMessage="Le titre du post doit faire plus de 3 caractères",
     *      max=255,
     *      maxMessage="Le titre du post doit faire moins de 255 caractères"
     * )
     */
    private $title;

    /**
     * @ORM\Column(type="text")
     * @Groups({"posts_read"})
     * @Assert\NotBlank(
     *      message="Le contenu de l'article est obligatoire." 
     * )
     * @Assert\Length(
     *      min=10,
     *      minMessage="Le contenu de votre article n'est pas suffisant, 10 caractère minimum."
     * )
     */
    private $content;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"posts_read"})
     * @@Assert\Type("\DateTimeInterface")
     * @var string A "H:i:s Y-m-d" formatted value
     */
    private $sendAt;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="posts")
     * @Groups({"posts_read"})
     * @Assert\NotBlank
     */
    private $author;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getSendAt(): ?\DateTimeInterface
    {
        return $this->sendAt;
    }

    public function setSendAt(\DateTimeInterface $sendAt): self
    {
        $this->sendAt = $sendAt;

        return $this;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): self
    {
        $this->author = $author;

        return $this;
    }
}
