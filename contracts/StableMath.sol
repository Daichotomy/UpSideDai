pragma solidity ^0.5.16;

/**
 * @title StableMath
 * @dev Accesses the Stable Math library using generic system wide variables for managing precision
 * Derives from OpenZeppelin's SafeMath lib
 */
library StableMath {
    /** @dev Scaling units for use in specific calculations */
    uint256 private constant fullScale = 1e18;
    uint256 private constant percentScale = 1e16; // 1% == 1e16

    /** @dev Getters */
    function getScale() internal pure returns (uint256) {
        return fullScale;
    }
    function getPercent() internal pure returns (uint256) {
        return percentScale;
    }

    /** @dev Scaled a given integer to the power of the full scale. */
    function scale(uint256 a) internal pure returns (uint256 b) {
        return mul(a, fullScale);
    }

    /** @dev Returns the addition of two unsigned integers, reverting on overflow. */
    function add(uint256 a, uint256 b) internal pure returns (uint256 c) {
        c = a + b;
        require(c >= a, "StableMath: addition overflow");
    }

    /** @dev Returns the subtraction of two unsigned integers, reverting on overflow. */
    function sub(uint256 a, uint256 b) internal pure returns (uint256 c) {
        require(b <= a, "StableMath: subtraction overflow");
        c = a - b;
    }

    /** @dev Returns the multiplication of two unsigned integers, reverting on overflow. */
    function mul(uint256 a, uint256 b) internal pure returns (uint256 c) {
        if (a == 0) {
            return 0;
        }
        c = a * b;
        require(c / a == b, "StableMath: multiplication overflow");
    }

    /** @dev Multiplies two numbers and truncates */
    function mulTruncate(uint256 a, uint256 b, uint256 _scale)
        internal
        pure
        returns (uint256 c)
    {
        uint256 d = mul(a, b);
        c = div(d, _scale);
    }

    /** @dev Multiplies two numbers and truncates using standard full scale */
    function mulTruncate(uint256 a, uint256 b)
        internal
        pure
        returns (uint256 c)
    {
        return mulTruncate(a, b, fullScale);
    }

    /** @dev Multiplies two numbers and truncates to ceil */
    function mulTruncateCeil(uint256 a, uint256 b)
        internal
        pure
        returns (uint256 c)
    {
        uint256 scaled = mul(a, b);
        uint256 ceil = add(scaled, sub(fullScale, 1));
        c = div(ceil, fullScale);
    }

    /** @dev Returns the integer division of two unsigned integers. Reverts on
     * division by zero. The result is rounded towards zero. */
    function div(uint256 a, uint256 b) internal pure returns (uint256 c) {
        require(b > 0, "StableMath: division by zero");
        c = a / b;
    }

    /** @dev Precisely divides two numbers, first by expanding */
    function divPrecisely(uint256 a, uint256 b)
        internal
        pure
        returns (uint256 c)
    {
        uint256 d = mul(a, fullScale);
        c = div(d, b);
    }

    /** @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts when dividing by zero. */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0, "StableMath: modulo by zero");
        return a % b;
    }

    /** @dev Returns minimum of two numbers */
    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a > b ? b : a;
    }

    /** @dev Returns maximum of two numbers */
    function max(uint256 a, uint256 b) internal pure returns (uint256) {
        return a > b ? a : b;
    }
}
