pragma solidity ^0.5.0;

//导入的包 Assert 中包括了 equality，inequality 以及 emptiness函数
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Adoption.sol";

contract TestAdoption {
 // 获取部署合约实例的地址
 Adoption adoption = Adoption(DeployedAddresses.Adoption());

// 测试一下智能合约中的 adopt 函数
function testUserCanAdoptPet() public {
  uint returnedId = adoption.adopt(expectedPetId);

  Assert.equal(returnedId, expectedPetId, "被收养的宠物与被返回的宠物 id 一致");
}

// 测试一下 单个 adopter 是否能正常返回
function testGetAdopterAddressByPetId() public {
  address adopter = adoption.adopters(expectedPetId);

  Assert.equal(adopter, expectedAdopter, "宠物的主人的在该实例化合同中");
}

// 测试所有的 adopters
function testGetAdopterAddressByPetIdInArray() public {
  // 领养者地址存到内存中
  address[16] memory adopters = adoption.getAdopters();

  Assert.equal(adopters[expectedPetId], expectedAdopter, "Owner of the expected pet should be this contract");
}

