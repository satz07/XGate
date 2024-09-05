/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface EtherspotWalletFactoryInterface extends utils.Interface {
  functions: {
    "accountCreationCode()": FunctionFragment;
    "accountImplementation()": FunctionFragment;
    "changeOwner(address)": FunctionFragment;
    "checkImplementation(address)": FunctionFragment;
    "createAccount(address,uint256)": FunctionFragment;
    "getAddress(address,uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "setImplementation(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "accountCreationCode"
      | "accountImplementation"
      | "changeOwner"
      | "checkImplementation"
      | "createAccount"
      | "getAddress"
      | "owner"
      | "setImplementation"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "accountCreationCode",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "accountImplementation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "changeOwner",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "checkImplementation",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "createAccount",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getAddress",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setImplementation",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "accountCreationCode",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "accountImplementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "checkImplementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createAccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getAddress", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setImplementation",
    data: BytesLike
  ): Result;

  events: {
    "AccountCreation(address,address,uint256)": EventFragment;
    "ImplementationSet(address)": EventFragment;
    "OwnerChanged(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AccountCreation"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ImplementationSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnerChanged"): EventFragment;
}

export interface AccountCreationEventObject {
  wallet: string;
  owner: string;
  index: BigNumber;
}
export type AccountCreationEvent = TypedEvent<
  [string, string, BigNumber],
  AccountCreationEventObject
>;

export type AccountCreationEventFilter = TypedEventFilter<AccountCreationEvent>;

export interface ImplementationSetEventObject {
  newImplementation: string;
}
export type ImplementationSetEvent = TypedEvent<
  [string],
  ImplementationSetEventObject
>;

export type ImplementationSetEventFilter =
  TypedEventFilter<ImplementationSetEvent>;

export interface OwnerChangedEventObject {
  newOwner: string;
}
export type OwnerChangedEvent = TypedEvent<[string], OwnerChangedEventObject>;

export type OwnerChangedEventFilter = TypedEventFilter<OwnerChangedEvent>;

export interface EtherspotWalletFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: EtherspotWalletFactoryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    accountCreationCode(overrides?: CallOverrides): Promise<[string]>;

    accountImplementation(overrides?: CallOverrides): Promise<[string]>;

    changeOwner(
      _newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    checkImplementation(
      _impl: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    createAccount(
      _owner: PromiseOrValue<string>,
      _index: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAddress(
      _owner: PromiseOrValue<string>,
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string] & { proxy: string }>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    setImplementation(
      _newImpl: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  accountCreationCode(overrides?: CallOverrides): Promise<string>;

  accountImplementation(overrides?: CallOverrides): Promise<string>;

  changeOwner(
    _newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  checkImplementation(
    _impl: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  createAccount(
    _owner: PromiseOrValue<string>,
    _index: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAddress(
    _owner: PromiseOrValue<string>,
    _index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  setImplementation(
    _newImpl: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    accountCreationCode(overrides?: CallOverrides): Promise<string>;

    accountImplementation(overrides?: CallOverrides): Promise<string>;

    changeOwner(
      _newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    checkImplementation(
      _impl: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    createAccount(
      _owner: PromiseOrValue<string>,
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getAddress(
      _owner: PromiseOrValue<string>,
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    setImplementation(
      _newImpl: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AccountCreation(address,address,uint256)"(
      wallet?: PromiseOrValue<string> | null,
      owner?: PromiseOrValue<string> | null,
      index?: null
    ): AccountCreationEventFilter;
    AccountCreation(
      wallet?: PromiseOrValue<string> | null,
      owner?: PromiseOrValue<string> | null,
      index?: null
    ): AccountCreationEventFilter;

    "ImplementationSet(address)"(
      newImplementation?: null
    ): ImplementationSetEventFilter;
    ImplementationSet(newImplementation?: null): ImplementationSetEventFilter;

    "OwnerChanged(address)"(newOwner?: null): OwnerChangedEventFilter;
    OwnerChanged(newOwner?: null): OwnerChangedEventFilter;
  };

  estimateGas: {
    accountCreationCode(overrides?: CallOverrides): Promise<BigNumber>;

    accountImplementation(overrides?: CallOverrides): Promise<BigNumber>;

    changeOwner(
      _newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    checkImplementation(
      _impl: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    createAccount(
      _owner: PromiseOrValue<string>,
      _index: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAddress(
      _owner: PromiseOrValue<string>,
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    setImplementation(
      _newImpl: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    accountCreationCode(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    accountImplementation(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    changeOwner(
      _newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    checkImplementation(
      _impl: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    createAccount(
      _owner: PromiseOrValue<string>,
      _index: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAddress(
      _owner: PromiseOrValue<string>,
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setImplementation(
      _newImpl: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
